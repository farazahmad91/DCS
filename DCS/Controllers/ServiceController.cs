﻿using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class ServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
