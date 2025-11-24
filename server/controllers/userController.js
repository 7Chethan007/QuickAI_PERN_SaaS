import sql from '../configs/db.js';

const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        await sql`SELECT * FROM creations WHERE user_id = ${userId} 
        ORDER BY created_at DESC`;

        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        
        res.json({ success: true, creations });
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql
        `SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        
        res.json({ success: true, creations });
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const toggleLikeCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body

        const [ creation ] = await sql`SELECT * FROM creations WHERE id = ${id}`;

        if(!creation) {
            return res.json({ success: false, message: 'Creation not found' });
        }

        const currectLikes = creation.likes || [];
        const userIdStr = String(userId);
        let updatedLikes;
        let message;
        if (currectLikes.includes(userIdStr)) {
            // unlike
            updatedLikes = currectLikes.filter(uid => uid !== userIdStr);
            message = 'Like removed';
        } else {
            // like
            updatedLikes = [...currectLikes, userIdStr];
            message = 'Like added';
        }

        const formatedArray = `{${updatedLikes.json(',')}}`

        await sql`UPDATE creations SET likes = ${formatedArray}::text[] WHERE id = ${id}`;
        
        res.json({ success: true, message });
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { getUserCreations, getPublishedCreations, toggleLikeCreations };