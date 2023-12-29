const CustomError = require("../errors");
const Token = require('../models/Token');
const { isTokenValid, attachCookiesToResponse } = require('../utils');

const authenticateUserRegionManager = async (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;

    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken);
            req.user = payload.user;
            if (req.user.role !== 'region_manager') {
                throw new CustomError.UnauthenticatedError('Role deo hop le');
            }
            return next();
        }

        const payload = isTokenValid(refreshToken);
        const existingToken = await Token.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        });

        if (!existingToken || !existingToken?.isValid) {
            throw new CustomError.UnauthenticatedError('Invalid access');
        }

        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Don't have permission");
    }
};

module.exports = {
    authenticateUserRegionManager
}