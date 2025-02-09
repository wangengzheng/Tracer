﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aiursoft.Pylon;
using Aiursoft.Pylon.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Tracer
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public bool IsDevelopment { get; set; }

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            IsDevelopment = env.IsDevelopment();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ServiceLocation>();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if(env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseEnforceHttps();
            }
            app.UsePathBase("/tracer");
            app.UseWebSockets();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
