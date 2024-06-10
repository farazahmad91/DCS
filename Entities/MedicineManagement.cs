using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Medicines
    {
        public int MedicineID { get; set; }
        public int StockID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Manufacturer { get; set; }
        public int MedTypeID { get; set; }
        public float Price { get; set; }
        public string? ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public string? Med_Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class MedicinesType
    {
        public int MedTypeID { get; set; }
        public string MedTypeName { get; set; }
    }
}
