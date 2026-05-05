// ─── Inspector de Ruido — micro:bit v2 ──────────────────
// Conectado al PC por USB | MakeCode
// Botón A → muestra valor numérico en display
// Botón B → envía lectura a la consola serie del PC
// ────────────────────────────────────────────────────────

let UMBRAL_VERDE = 50
let UMBRAL_YELLOW = 120
let nivel = 0

basic.showString("INSPECTOR")
basic.pause(1000)

// ── Bucle principal ──────────────────────────────────────
basic.forever(function () {
    nivel = input.soundLevel()   // 0 – 255

    if (nivel < UMBRAL_VERDE) {
        // 🟢 TRANQUILO
        basic.showIcon(IconNames.Happy)

    } else if (nivel < UMBRAL_YELLOW) {
        // 🟡 MODERADO
        basic.showIcon(IconNames.Meh)

    } else {
        // 🔴 RUIDOSO
        basic.showIcon(IconNames.Angry)
        music.playTone(880, 150)
    }

    basic.pause(800)
})

// ── Botón A: muestra el número en el display ─────────────
input.onButtonPressed(Button.A, function () {
    basic.showNumber(nivel)
})

// ── Botón B: envía dato por serie al PC ──────────────────
input.onButtonPressed(Button.B, function () {
    serial.writeLine("nivel:" + nivel)
})