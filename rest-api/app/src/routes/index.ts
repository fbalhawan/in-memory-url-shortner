import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import UrlStorage from '../storage/url-storage';
const urlStorage = new UrlStorage();
const router = Router();
const HOST_URL = process.env.HOST_URL || "http://short.est";

const validateUrl = [
        check('url').isURL().withMessage('Invalid URL format')
];

router.get('/encode/:url', validateUrl ,async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {url} = req.params;
    const key = await urlStorage.encode(url);
    const shortUrl = `${HOST_URL}/${key}`;

    res.json({
        shortUrl,
        encoded: encodeURIComponent(shortUrl)
    });
});


router.get('/decode/:url',validateUrl,async (req: Request, res: Response ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {url} = req.params;
    const key = url.substring(url.lastIndexOf('/')+1);
    const fullUrl = await urlStorage.decode(`${key}`);
    if(fullUrl){
        res.redirect(fullUrl);
    }
    else{
        res.sendStatus(404);
    }
    
});

export default router;