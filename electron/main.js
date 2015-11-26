import app from 'app'; // Módulo para controlar el ciclo de vida de la aplicación.
import BrowserWindow from 'browser-window'; // Módulo para crear uan ventana de navegador.
import crashReporter from 'crash-reporter'; // Reportar crashes a nuestro servidor.
import ApplicationIndex from './app/application/index';
import usbDetect from 'usb-detection';
//import Menu from 'menu';
//import appMenu from './browser/menu/appMenu';

// Mantener una referencia global al objeto window, si no lo haces, esta ventana
// se cerrará automáticamente cuando el objeto JavaScript sea recolectado (garbage collected):
var mainWindow = null;

// Salir de todas las ventanas cuando se cierren.
app.on('window-all-closed', function() {
  // En OS X es común que las aplicaciones y su barra de menú
  // se mantengan activas hasta que el usuario cierre la aplicación
  // explícitamente utilizando Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Este método será llamado cuando Electron haya finalizado la inicialización
// y esté listo para crear ventanas de navegador.
app.on('ready', function() {
  // Crear la ventana.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // cargar el index.html de nuestra aplicación.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Desplegar devtools.
  mainWindow.openDevTools();

  //Menu.setApplicationMenu(appMenu);

  new ApplicationIndex(mainWindow);

  // Evento emitido cuando se cierra la ventana.
  mainWindow.on('closed', function() {
    // Eliminar la referencia del objeto window.
    // En el caso de soportar multiples ventanas, es usual almacenar
    // los objetos window en un array, este es el momento en el que debes eliminar el elemento correspondiente.

    usbDetect.stopMonitoring();

    mainWindow = null;
  });
});
