const originalData = [
    {
        "Nom                      Prénom             Groupe TP   TP        Examen Note finale": "GHAZI              OUSSAMA SOHEIB      4    17      10     12,8"
    },
    // Add more data entries here
];

const extractedData = originalData.map(entry => {
    const parts = entry["Nom                      Prénom             Groupe TP   TP        Examen Note finale"].split(/\s{2,}/);

    // Extract the "Nom" and "Prénom" values by splitting by space
    const nomPrenom = parts[0].split(/\s+/);

    // Extract the "Prénom" value, considering it might have multiple parts
    const prenom = nomPrenom.slice(1).join(' ');

    // Extract the "Note finale" value
    const noteFinale = parts[parts.length - 1];

    // Convert note finale to a float, replacing comma with dot for decimal numbers
    const noteFinaleValue = parseFloat(noteFinale.replace(',', '.'));

    return {
        Nom: nomPrenom[0],
        'Prénom': prenom,
        'Note finale': noteFinaleValue
    };
});

console.log(extractedData);
