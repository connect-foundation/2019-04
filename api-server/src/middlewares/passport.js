import passport from 'passport';
import { User } from '../models';
import { Strategy as GitHubStrategy } from 'passport-github';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI
} from '../config';

const clientOption = {
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: GITHUB_REDIRECT_URI
};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GitHubStrategy(clientOption, (_, __, { username, photos }, done) => {
		User.findOneAndUpdate(
			{ username },
			{ $set: { username } },
			{
				upsert: true,
				new: true
			}
		).then(data => {
			const user = {
				username: data.username,
				avatar: photos[0].value
			};
			return done(null, user);
		}).catch(() => {
			return done(null, null);
		});
	})
);

export default passport;
