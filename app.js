// Enter bosilganda qidiruv funksiyasini chaqiradi
document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchManga();
    }
});

// Manga qidirish funksiyasi
async function searchManga() {
    const query = document.getElementById("search-input").value.trim();
    const resultsDiv = document.getElementById("results");
    const loader = document.getElementById("loader");

    resultsDiv.innerHTML = ""; // Oldingi natijalarni tozalash

    if (!query) {
        alert("Iltimos, manga nomini kiriting!");
        return;
    }

    // Loaderni ko'rsatish
    loader.style.display = "block";

    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=6`);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            resultsDiv.innerHTML = "<p>Hech narsa topilmadi!</p>";
            return;
        }

        data.data.forEach(manga => {
            const mangaDiv = document.createElement("div");
            mangaDiv.classList.add("manga");

            mangaDiv.innerHTML = `
                <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
                <h3>${manga.title}</h3>
                <p><strong>Holati:</strong> ${manga.status}</p>
                <p><strong>Reyting:</strong> ${manga.score ?? "Noma'lum"}</p>
            `;

            resultsDiv.appendChild(mangaDiv);
        });

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        resultsDiv.innerHTML = "<p>Xatolik yuz berdi, iltimos qayta urinib ko'ring.</p>";
    } finally {
        // Loaderni yashirish
        loader.style.display = "none";
    }
}
