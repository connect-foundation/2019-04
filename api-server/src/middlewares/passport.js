import dotenv from 'dotenv';
import passport from 'passport';
import { User } from '../models';
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
		User.findOneAndUpdate(
			{ username: profile.username },
			{ $set: { username: profile.username } },
			{ upsert: true }
		).then(data => {
			const user = {
				username: data.username,
				avatar: profile.photos[0].value
			};
			return done(null, user);
		}).catch(() => {
			return done(null, null);
		});
	})
);

export default passport;
