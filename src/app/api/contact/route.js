export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process the form data here
        const { name, email, message } = req.body;
        console.log('Received form data:', { name, email, message });

        // Example: Send a response
        res.status(200).json({ success: true });
    } else {
        // Method not allowed
        res.status(405).end();
    }
}
