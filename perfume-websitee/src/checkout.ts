export async function checkout(productId: string = 'vapor75') {
    try {
        const res = await fetch(`/api/checkout/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response was not JSON");
        }

        const data = await res.json();
        
        if (!data.url) {
            throw new Error('No checkout URL received');
        }

        window.location.href = data.url;
    } catch (error) {
        console.error("Purchase Failed:", error);
        // You might want to show an error UI to the user here
        throw error;
    }
}