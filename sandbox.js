
//OPENAI
// require('dotenv').config()

// const { Configuration, OpenAIApi } = require("openai"); 

// // Menginisialisasi konfigurasi dengan API Key OpenAI
// const configuration = new Configuration({ 
//     apiKey: process.env.OPENAI_API_KEY,
// });

// // Membuat objek OpenAIApi dengan konfigurasi yang telah disediakan
// const openai = new OpenAIApi(configuration); 

// // Fungsi untuk membuat permintaan ke API OpenAI
// const generateText = async (prompt) => {
//     try {
//         // Menggunakan model bahasa alami "text-davinci-002"
//         const response = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: "Hello, my name is ChatGPT. ",
//             maxTokens: 2048, 
//             temperature: 1 
//         });

//         // Mengembalikan teks yang dihasilkan oleh model
//         return response.data;
//     } catch (error) { 
//         throw error;
//     }
// };

// // Contoh penggunaan
// generateText("Hello, my name is ChatGPT. ") 
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });







// const countryCodes = ["US", "CA", "GB", "AU", "IL"]; // array kode negara
// const displayNames = new Intl.DisplayNames(['en'], {type: 'region'}).of("US"); // membuat objek Intl.DisplayNames dengan bahasa Inggris dan jenis data region

// countryCodes.forEach(code => {
//   const countryName = displayNames.of(code); // mendapatkan nama negara dari kode negara
// });

console.log(new Intl.DisplayNames(['en'], {type: 'region'}).of("US")// membuat objek Intl.DisplayNames dengan bahasa Inggris dan jenis data region
); // menampilkan hasil dalam format kode negara: nama negara