﻿using Bilioteca.Service.Account;
using Bilioteca.Service.Carreras;
using Bilioteca.Service.Catalog;
using Bilioteca.Service.Rol;
using Bilioteca.Service.Users;

namespace Bilioteca.Service
{
    // En una carpeta como Services o Infrastructure
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            // Agrega aquí más servicios según sea necesario
            services.AddScoped<CatalogService>();
            services.AddScoped<AccountService>();
            services.AddScoped<RolService>();
            services.AddScoped<CarrerasService>();
            services.AddScoped<UserService>();
        }
    }

}
