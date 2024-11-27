const requiredEnvVars = ["PORT", "NODE_ENV", "MONGODB_URI"];

function validateEnv() {
    const missingEnvVars = [];

    requiredEnvVars.forEach((envVars) => {
        if (!process.env[envVars]) {
            missingEnvVars.push(envVars);
        }
    });

    if (missingEnvVars.length > 0) {
        throw new Error(
            `The following environment variables are missing: ${missingEnvVars.join(", ")}`
        );
    }
}

module.exports = validateEnv;
