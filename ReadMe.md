# UF07Web – Progetto Web con Esercizi Interattivi

Questo progetto contiene tre applicazioni web sviluppate con **HTML**, **CSS** e **JavaScript**, ognuna in due versioni: **base** e **avanzata**.

---

## 📁 Struttura del progetto

```
UF07Web/
│
├── index.html                # Homepage con link ai progetti
├── js/                       # Logica JavaScript per ogni app
│   ├── task-manager-base.js
│   ├── task-manager-advanced.js
│   ├── cronometro-base.js
│   ├── cronometro-advanced.js
│   ├── meteo-base.js
│   └── meteo-advanced.js
├── style/                    # Stili CSS per ogni app
│   ├── task-manager.css
│   ├── cronometro.css
│   ├── meteo.css
│   └── index.css
└── projects/                 # Pagine HTML dei singoli progetti
    ├── task-manager-base.html
    ├── task-manager-advanced.html
    ├── cronometro-base.html
    ├── cronometro-advanced.html
    ├── meteo-base.html
    └── meteo-advanced.html
```

---

## 📌 Moduli presenti

### ✅ Task Manager

- **Base:** aggiunta ed eliminazione di attività
- **Avanzata:** completamento, filtri, ricerca, modifica, conteggio attività, eliminazione definitiva e ripristino

### ⏱️ Cronometro

- **Base:** start, stop, reset
- **Avanzata:** giri (lap), resume, lista giri, riepilogo corsa

### 🌤️ MeteoApp

- **Base:** meteo per posizione fissa (temperatura, umidità, pioggia, vento, ecc.)
- **Avanzata:** meteo per posizione attuale tramite geolocalizzazione, dettagli meteo, icone, elenco città famose

---

## 🛠️ Come usare

Apri `index.html` in un browser e seleziona l'app che vuoi testare.  
Tutti i progetti funzionano **senza server**.

---

## 👨‍💻 Per sviluppatori

- I file JS seguono la convenzione `nome-funzionalità-versione.js`
- Tutte le funzioni sono documentate con **JSDoc**
- Commit organizzati secondo [Conventional Commits](https://www.conventionalcommits.org/it/v1.0.0/)
- Stile minimale ma responsivo per ogni app
- Le API meteo sono fornite da **Open-Meteo** (servizio gratuito, senza chiave)
- Per il reverse geocoding viene usato **OpenStreetMap Nominatim**
- Nessuna dipendenza esterna: solo HTML, CSS, JS puro

---

## 📚 API Utilizzate

- **Open-Meteo API:**  
  https://api.open-meteo.com/v1/forecast  
  Recupero delle condizioni meteo attuali (temperatura, umidità, precipitazioni, pioggia, copertura nuvole, vento, codice meteo).

- **OpenStreetMap Nominatim:**  
  https://nominatim.openstreetmap.org/reverse  
  Reverse geocoding per ottenere il nome della città a partire da coordinate geografiche.

- **Geolocalizzazione Browser:**  
  `navigator.geolocation`  
  Ottenere la posizione attuale dell’utente per mostrare il meteo locale.

---

## ℹ️ Altre informazioni

- **Responsive Design:** Tutte le pagine sono ottimizzate per desktop e mobile.
- **Accessibilità:** I pulsanti sono accessibili tramite tastiera e hanno contrasto adeguato.
- **Facilità di estensione:** La struttura a cartelle e la modularità del codice facilitano l'aggiunta di nuove funzionalità.
- **Sicurezza:** Non vengono richiesti dati sensibili e tutte le API usate sono pubbliche.

---

**Autore:** Emmanuele Grassi  
**Docente:** Pietro Rocchio
