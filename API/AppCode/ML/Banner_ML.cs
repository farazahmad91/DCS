using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class Banner_ML : IBanner
    {
        private readonly IDapper _dapper;
        public Banner_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateBanner(BannerImage banner)
        {
            IProcedureAsync proc = new Proc_AddBanner(_dapper);
            var i = await proc.Call(banner);
            return (Response)i;
        }

        public async Task<Response> BannerModifyStatus(int Id)
        {
            IProcedureAsync proc = new Proc_BannerModifyStatus(_dapper);
            var i = await proc.Call(Id);
            return (Response)i;
        }

        public async Task<IEnumerable<BannerImage>> GetBanner(string? name)
        {
            IProcedureAsync proc = new Proc_GetBanner(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<BannerImage>)i;
        }

        public async Task<BannerImage> GetBannerById(int Id)
        {
            IProcedureAsync proc = new Proc_GetBannerById(_dapper);
            var i = await proc.Call(Id);
            return (BannerImage)i;
        }
    }
}
