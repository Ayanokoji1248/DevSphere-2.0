// utils/createUserFolder.ts
import supabase from "../config/supabaseConfig.js";

export const createUserFolder = async (userId: string) => {
    try {
        // ✅ create a small placeholder file
        const buffer = Buffer.from("Initialized user folder", "utf-8");

        const { data, error } = await supabase.storage
            .from("DevSphere2") // make sure bucket name matches exactly (case-sensitive)
            .upload(`${userId}/.init.md`, buffer, {
                contentType: "text/markdown",
                upsert: false, // prevents overwriting
            });

        if (error) {
            if (error.message.includes("already exists")) {
                console.log(`Folder already exists for user: ${userId}`);
                return;
            }
            throw error;
        }

        // console.log(`✅ Folder created for user: ${userId}`);
    } catch (error: any) {
        console.error("❌ Error creating user folder:", error.message);
    }
};
