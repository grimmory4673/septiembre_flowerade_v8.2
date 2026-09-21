# 🎵 Cómo agregar "Flores Amarillas" de Floricienta

## Opción 1: Archivo Local (Recomendado)

1. **Descarga** el archivo de audio de "Flores Amarillas" desde una fuente legal:
   - YouTube Music (con YouTube Premium)
   - Spotify (descarga offline)
   - iTunes/Apple Music
   - Amazon Music
   - Cualquier plataforma digital donde hayas comprado la canción

2. **Convierte** el archivo a formato MP3 si es necesario

3. **Guarda** el archivo como `flores-amarillas.mp3` en la misma carpeta que `index.html`

4. **Actualiza** el código HTML reemplazando las fuentes de audio:

```html
<audio id="backgroundMusic" loop preload="auto">
    <source src="c:\Users\User\Downloads\Flores-Amarillas.mp3" type="audio/mpeg">
</audio>
```

## Opción 2: Usar el Audio Generado

Si no puedes obtener el archivo de audio, la página incluye:
- **Melodía generada** inspirada en el estilo de la canción
- **Tonos alegres** similares al espíritu de "Flores Amarillas"
   - **Ambiente alegre** que complementa la presentación

## Opción 3: Streaming (Avanzado)

Si tienes experiencia técnica, puedes usar APIs de:
- Spotify Web API
- YouTube Music API
- SoundCloud API

**Nota Legal**: Asegúrate de tener los derechos para usar la música, especialmente si planeas compartir la presentación públicamente.

## 🎼 Configuración Actual

La página está configurada para:
1. Intentar cargar "Flores Amarillas" desde fuentes online
2. Si falla, usar melodía generada inspirada en la canción
3. Control manual para pausar/reanudar
4. Volumen optimizado para no interferir con la experiencia

## 💡 Consejos

- **Volumen**: Ajustado automáticamente al 30%
- **Bucle**: La canción se repite automáticamente
- **Móvil**: Funciona en dispositivos móviles tras interacción del usuario
- **Control**: Botón flotante en la esquina superior derecha

¡Disfruta de la experiencia con la banda sonora perfecta! 🌻💛