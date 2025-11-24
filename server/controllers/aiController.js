import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan; // 'premium' or 'free'
        const free_usage = req.free_usage; // number of free usages left

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: 'Free usage limit reached. Please upgrade to premium plan.'
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        // If user is on free plan, increment their free_usage count
        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, article: content });



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}


const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan; // 'premium' or 'free'
        const free_usage = req.free_usage; // number of free usages left

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({
                success: false,
                message: 'Free usage limit reached. Please upgrade to premium plan.'
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

        // If user is on free plan, increment their free_usage count
        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, article: content });



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}

const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan; // 'premium' or 'free'

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: 'This feature is available for premium users only. Please upgrade to premium plan.'
            });
        }

        // To geterate image let's use clipdrop api
        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY, },
            responseType: 'arraybuffer'
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        // Save the generated image in the Cloudinary
        const { secure_url } = await cloudinary.uploader.upload(base64Image)

        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;


        res.json({ success: true, content: secure_url });



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}

const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { image } = req.file;
        const plan = req.plan; // 'premium' or 'free'

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: 'This feature is available for premium users only. Please upgrade to premium plan.'
            });
        }

        // Upload image to cloudinary background removal & transform
        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: {
                effect: "background_removal",
                background_removal: "remove_the_background"
            }
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, 'Remove Background from the image', ${secure_url}, 'image')`;


        res.json({ success: true, content: secure_url });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}

const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const { image } = req.file;
        const plan = req.plan; // 'premium' or 'free'

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: 'This feature is available for premium users only. Please upgrade to premium plan.'
            });
        }

        // Upload image to cloudinary background removal
        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}`, }],
            resource_type: "image"
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${`Remove Object: ${object}`} , ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}

const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan; // 'premium' or 'free'

        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: 'This feature is available for premium users only. Please upgrade to premium plan.'
            });
        }

        if(resume.size > 5 * 1024 * 1024){
            return res.json({
                success: false,
                message: 'File size exceeds the limit of 5MB.'
            });
        }

        const dataBuffer  = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);
        
        const prompt = `Review the following resume and provide constructive feedback on 
        its strengths, weaknesses and areas for improvement. Resume Content: \n\n ${pdfData.text}`;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "HR Recruiter", content: "Your an HR Recruiter trying to review resumes and provide constructive feedback." },
                {role: "user", content: prompt,},
            ],
            temperature: 0.7,
            max_tokens: length,
        });
        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

        res.json({ success: true, content: content });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to generate article' });
    }
}

export {
    generateArticle,
    generateBlogTitle,
    generateImage,
    removeImageBackground,
    removeImageObject,
    resumeReview
};