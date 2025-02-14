const broker = "wss://test.mosquitto.org:8081"; // Cambia esto por la IP de tu RPi si usas un broker local
const topic = "sensores/datos"; // Asegúrate de que coincide con el topic que envía la RPi

const client = mqtt.connect(broker);

client.on("connect", () => {
    console.log("Conectado al broker MQTT");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Suscrito a ${topic}`);
        } else {
            console.error("Error al suscribirse:", err);
        }
    });
});

client.on("message", (topic, message) => {
    try {
        const data = JSON.parse(message.toString());

        document.getElementById("temp_externa").textContent = data.temperatura_externa;
        document.getElementById("luz").textContent = data.luz;
        document.getElementById("temp_placa").textContent = data.temperatura_placa;
        document.getElementById("humedad_placa").textContent = data.humedad_placa;
        document.getElementById("presion").textContent = data.presion;
        document.getElementById("movimiento").textContent = data.movimiento;
    } catch (error) {
        console.error("Error al procesar mensaje:", error);
    }
});
