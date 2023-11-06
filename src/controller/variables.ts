// variables.ts
export const extractUserVariables = (body: any) => {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        profilePicture,
        bio,
        phoneNumber,
        address,
        socialLinks,
        privacySettings,
    } = body;

    return {
        username,
        password,
        firstName,
        lastName,
        email,
        profilePicture,
        bio,
        phoneNumber,
        address,
        socialLinks,
        privacySettings,
    };
};

export const extractUserUpdateVariables = (body: any) => {
    const {
        username,
        password, // We will handle password hashing separately in the update function
        firstName,
        lastName,
        email,
        profilePicture,
        bio,
        phoneNumber,
        address,
        isActive,
        emailVerified,
        lastLogin,
        role,
        socialLinks,
        privacySettings,
    } = body;

    return {
        username,
        password, // Include password here to check if it was provided
        firstName,
        lastName,
        email,
        profilePicture,
        bio,
        phoneNumber,
        address,
        isActive,
        emailVerified,
        lastLogin,
        role,
        socialLinks,
        privacySettings,
    };
};
