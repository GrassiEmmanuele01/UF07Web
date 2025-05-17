# EG-EsameUF07

## Descrizione del Progetto

Questo repository contiene i progetti realizzati per l'unità formativa UF07 (Web) del corso AFPMarconi, docente Pietro Rocchio. L'obiettivo è mostrare competenze nello sviluppo di applicazioni web front-end tramite HTML, CSS e JavaScript, con particolare attenzione a logica, interattività e stile.

## Struttura del Progetto

```
UF07Web/
│
├── index.html                # Pagina principale per la selezione dei progetti
├── projects/                 # Pagine HTML dei singoli progetti
│     ├── task-manager-base.html
│     ├── task-manager-advanced.html
│     ├── cronometro-base.html
│     ├── cronometro-advanced.html
│     ├── meteo-base.html
│     └── meteo-advanced.html
├── js/                       # File JavaScript per la logica dei progetti
│     ├── task-manager-base.js
│     ├── task-manager-advanced.js
│     ├── cronometro-base.js
│     ├── cronometro-advanced.js
│     ├── meteo-base.js
│     └── meteo-advanced.js
├── style/                    # File CSS per la grafica dei progetti
│     ├── index.css
│     ├── task-manager.css
│     ├── cronometro.css
│     └── meteo.css
└── ReadMe.md                 # Documentazione del progetto
```

## Progetti Inclusi

- **Task Manager - Base**: Gestione semplice di una lista di attività.
- **Task Manager - Avanzato**: Gestione avanzata con filtri, ricerca, modifica stato e nome delle attività.
- **Cronometro - Base**: Cronometro semplice con start, stop e reset.
- **Cronometro - Avanzato**: Cronometro con misurazione millisecondi e salvataggio dei giri.
- **Meteo App - Base**: Visualizzazione delle condizioni meteo di una posizione fissa.
- **Meteo App - Avanzato**: Visualizzazione delle condizioni meteo della posizione attuale tramite geolocalizzazione.

## Modalità di Utilizzo

1. Apri `index.html` in un browser.
2. Seleziona il progetto desiderato tramite i pulsanti.
3. Ogni progetto è autonomo e può essere utilizzato direttamente dalla relativa pagina.

## Dipendenze

- Tutti i progetti sono realizzati in HTML, CSS e JavaScript puro, senza dipendenze esterne.
- Le API utilizzate sono gratuite e non richiedono autenticazione.

## API Utilizzate

### Open-Meteo API
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Utilizzo:** Recupero delle condizioni meteo attuali (temperatura, umidità, precipitazioni, pioggia, copertura nuvole, vento, codice meteo).
- **Esempio di richiesta:**
  ```
  https://api.open-meteo.com/v1/forecast?latitude=46.0679&longitude=11.1211&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m
  ```

### OpenStreetMap Nominatim
- **Endpoint:** `https://nominatim.openstreetmap.org/reverse`
- **Utilizzo:** Reverse geocoding per ottenere il nome della città a partire da coordinate geografiche.
- **Esempio di richiesta:**
  ```
  https://nominatim.openstreetmap.org/reverse?format=json&lat=46.0679&lon=11.1211&zoom=18&addressdetails=1
  ```

### Geolocalizzazione Browser
- **API:** `navigator.geolocation`
- **Utilizzo:** Ottenere la posizione attuale dell’utente per mostrare il meteo locale.

## Documentazione Tecnica e JSDoc

Tutti i file JavaScript sono documentati con commenti in stile JSDoc. Esempio per il cronometro base:

```js
/**
 * Aggiorna lo stato dei pulsanti Start, Stop e Reset in base allo stato del timer.
 */
function updateButtonStates() { ... }

/**
 * Avvia il cronometro. Se è già in corso una corsa precedente, la resetta.
 */
function startTimer() { ... }

/**
 * Ferma il cronometro e aggiorna lo stato dei pulsanti.
 */
function stopTimer() { ... }

/**
 * Reimposta il cronometro a zero e aggiorna la visualizzazione.
 */
function resetTimer() { ... }

/**
 * Aggiorna la visualizzazione del timer nel formato mm:ss.
 */
function updateTimer() { ... }
```

## Altre Informazioni Utili

- **Responsive Design:** Tutte le pagine sono ottimizzate per dispositivi desktop e mobile.
- **Accessibilità:** I pulsanti sono accessibili tramite tastiera e hanno un contrasto adeguato.
- **Facilità di Estensione:** La struttura a cartelle e la modularità del codice facilitano l'aggiunta di nuove funzionalità o progetti.
- **Stile:** I CSS sono suddivisi per progetto per una migliore manutenzione e personalizzazione.
- **Sicurezza:** Non vengono richiesti dati sensibili e tutte le API usate sono pubbliche.

---

**Autore:** Emmanuele Grassi  
**Docente:** Pietro Rocchio