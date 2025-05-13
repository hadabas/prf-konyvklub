FROM node:18

# Angular CLI globálisan
RUN npm install -g @angular/cli

# Alkalmazás mappája
WORKDIR /app

# Másolás
COPY . .

# Függőségek telepítése (root szinten)
RUN npm install

# Portok megnyitása
EXPOSE 4200
EXPOSE 5000

# Indítsuk el mindkét folyamatot
CMD ["npm", "run", "start"]