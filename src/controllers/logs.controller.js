import fs from "fs";
import path from "path";
import { NotFoundErr } from "../utils/AppError.js";
import { fileURLToPath } from "url";

// __dirname workaround (kyunki ESM me default __dirname nahi hota)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readLogs = async (req, res, next) => {
    try {
        const logFilePath = path.join(__dirname, "../../logs/app.log");

        if (!fs.existsSync(logFilePath)) {
            return next(new NotFoundErr("Log file not found", 404));
        }

        const data = fs.readFileSync(logFilePath, "utf8");
        const logs = data.split("\n").filter(line => line.trim() !== "");

        res.json({
            success: true,
            count: logs.length,
            logs,
        });
    } catch (err) {
        next(err);
    }
};
