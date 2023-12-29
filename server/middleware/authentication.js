const Token = require('../models/Token');
const CustomError = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Invalid authentication');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication. Need access token');
  }
};

const authenticatePointStaff = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role) {
      if (role === "point_staff") {
        return next();
      } else {
        throw new CustomError.UnauthenticatedError('Invalid authentication. You are not the point staff.');
      }
    } else {
      throw new CustomError.UnauthenticatedError('Invalid request.');
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication.');
  }
}

const authenticateRegionStaff = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role) {
      if (role === "region_staff") {
        return next();
      } else {
        throw new CustomError.UnauthenticatedError('Invalid authentication. You are not the region staff.');
      }
    } else {
      throw new CustomError.UnauthenticatedError('Invalid request.');
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication.');
  }
}

const authenticatePointManager = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role) {
      if (role === "point_manager") {
        return next();
      } else {
        throw new CustomError.UnauthenticatedError('Invalid authentication. You are not the point manager.');
      }
    } else {
      throw new CustomError.UnauthenticatedError('Invalid request.');
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication.');
  }
}

const authenticateRegionManager = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role) {
      if (role === "region_manager") {
        return next();
      } else {
        throw new CustomError.UnauthenticatedError('Invalid authentication. You are not the region manager.');
      }
    } else {
      throw new CustomError.UnauthenticatedError('Invalid request.');
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication.');
  }
}

const authenticateLeader = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (role) {
      if (role === "leader") {
        return next();
      } else {
        throw new CustomError.UnauthenticatedError('Invalid authentication. You are not the leader.');
      }
    } else {
      throw new CustomError.UnauthenticatedError('Invalid request.');
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication.');
  }
}

const authorizePermissions = (...authorizedRoles) => {
  // when adding authorizePermissions middleware, we write it like this authorizePermissions('admin', 'owner')
  // but this call the function immediately
  // that's why we must return a function to reference to it
  return (req, res, next) => {
    if (!authorizedRoles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route',
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  authenticatePointStaff,
  authenticatePointManager,
  authenticateRegionManager,
  authenticateRegionStaff,
  authenticateLeader
};
