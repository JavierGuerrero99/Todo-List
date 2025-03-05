# Usa Nginx para servir archivos estáticos
FROM nginx:latest

# Copia los archivos de la carpeta `build/` al directorio de Nginx
COPY build /usr/share/nginx/html

# Copia una configuración de Nginx personalizada (Opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]