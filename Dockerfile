# Gunakan Nginx sebagai static server
FROM nginx:alpine

# Hapus default config bawaan
RUN rm /etc/nginx/conf.d/default.conf

# Copy konfigurasi custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build dari GitHub Action
COPY dist /usr/share/nginx/html

# Expose port (sesuai dengan docker-compose)
EXPOSE 3005

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
