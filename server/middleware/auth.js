import jwt from 'jsonwebtoken';



// wants to like a post 
// clicking the like button ==> auth middleware (NEXT) => like controller ... 



const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split( " " )[1];
        const isCoustomAuth = token.length < 500;

        let decodeData;

        if (token && isCoustomAuth) {
            decodeData = jwt.verify(token, 'test');

            req.userId = decodeData?.indexOf;


        }else {
            decodeData = jwt.decode(token);

            req.userId = decodeData?.sub;
        }

        next();
    } catch (error) {


        console.log (error);
    }
};

export default auth;