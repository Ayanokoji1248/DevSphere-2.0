import supabase from "../config/supabaseConfig"

const generateImageUrl = async (userId: string, file: File) => {
    try {
        const fileName = Date.now().toString()
        const { error } = await supabase.storage.from("DevSphere2").upload(`${userId}/${fileName}`, file)

        if (error) {
            throw error
        }

        const { data } = supabase.storage.from("DevSphere2").getPublicUrl(`${userId}/${fileName}`);

        if (!data || !data.publicUrl) {
            throw new Error("Failed to generate public URL");
        }

        console.log(data.publicUrl)
        return data.publicUrl

    } catch (error) {
        console.error("Error Uploading File: ", error);
        return null
    }
}

export default generateImageUrl