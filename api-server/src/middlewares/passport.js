import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

dotenv.config();

const clientOption = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_REDIRECT_URI
};

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GitHubStrategy(clientOption, (accessToken, _, profile, done) => {
            //TODO 넘어온 user profile 정보 db 처리 필요
            return done(null, profile);
        }
    )
);

export default passport;