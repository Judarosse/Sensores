const broker = "ws://192.168.1.8:9001"; // WebSockets en el puerto correcto
const topic = "sensores/datos"; // Asegúrate de que coincide con el topic de la RPi

const client = mqtt.connect(broker);

client.on("connect", () => {
    console.log("✅ Conectado al broker MQTT");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`📡 Suscrito a: ${topic}`);
        } else {
            console.error("❌ Error al suscribirse:", err);
        }
    });
});

client.on("message", (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        
        document.getElementById("tempExt").textContent = `${data.temperatura_externa} °C`;
        document.getElementById("luz").textContent = `${data.luz} Lux`;
        document.getElementById("tempPlaca").textContent = `${data.temperatura_placa} °C`;
        document.getElementById("humPlaca").textContent = `${data.humedad_placa} %`;
        document.getElementById("presion").textContent = `${data.presion} Pa`;
        document.getElementById("movimiento").textContent = data.movimiento ? "Detectado" : "No detectado";

        console.log("📥 Datos recibidos:", data);
    } catch (error) {
        console.error("⚠️ Error al procesar mensaje:", error);
    }
});
