document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const resultsDiv = document.getElementById('results');
    const apiKey = 'Key-api ponla a qui';

    fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Añadido para depuración
            resultsDiv.innerHTML = '';
            
            if (data.data) {
                const { result, score, regexp, gibberish, disposable, webmail, mx_records, smtp_server, smtp_check, accept_all, block, sources } = data.data;

                resultsDiv.innerHTML = `
                    <p><strong>Resultado:</strong> ${result} (Si el correo electrónico es entregable)</p>
                    <p><strong>Puntaje:</strong> ${score} (La probabilidad de que el correo electrónico sea válido)</p>
                    <p><strong>Regexp:</strong> ${regexp} (Si el formato del correo electrónico es válido)</p>
                    <p><strong>Gibberish:</strong> ${gibberish} (Si el correo electrónico parece ser una cadena sin sentido)</p>
                    <p><strong>Desechable:</strong> ${disposable} (Si el correo electrónico es de un servicio desechable)</p>
                    <p><strong>Webmail:</strong> ${webmail} (Si el correo electrónico es de un servicio de webmail como Gmail o Yahoo)</p>
                    <p><strong>Registros MX:</strong> ${mx_records} (Si existen registros MX para el dominio del correo electrónico)</p>
                    <p><strong>Servidor SMTP:</strong> ${smtp_server} (Si el servidor SMTP del correo electrónico es válido)</p>
                    <p><strong>Chequeo SMTP:</strong> ${smtp_check} (Si se pudo establecer conexión con el servidor SMTP)</p>
                    <p><strong>Acepta Todos:</strong> ${accept_all} (Si el servidor acepta todos los correos electrónicos)</p>
                    <p><strong>Bloqueado:</strong> ${block} (Si el dominio del correo electrónico está bloqueado)</p>
                `;

                if (sources && sources.length > 0) {
                    resultsDiv.innerHTML += '<h3>Fuentes:</h3>';
                    sources.forEach(source => {
                        resultsDiv.innerHTML += `
                            <p>Dominio: ${source.domain}</p>
                            <p>URL: ${source.uri}</p>
                            <p>Fecha de Añadido: ${source.added}</p>
                        `;
                    });
                }
            } else {
                resultsDiv.innerHTML = 'No se encontraron datos para este correo electrónico.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'Ocurrió un error al consultar los datos.';
        });
});
