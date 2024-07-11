using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public enum Events
    {
        Non = 0,
        RegisterUser = 1,
        OrderPlace = 2,
        OTP = 3,
        FundTransfer = 4,
        FundReceive = 5,
        OrderAssignment = 6,
    }
}
