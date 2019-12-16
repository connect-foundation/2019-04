import passport from 'passport';
import { User } from '../models';
import { Strategy as GitHubStrategy } from 'passport-github';
import { PASSPORT_CLIENT_OPTION } from '../config';

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GitHubStrategy(
		PASSPORT_CLIENT_OPTION,
		(_, __, { username, photos }, done) => {
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
		}
	)
);

export default passport;
