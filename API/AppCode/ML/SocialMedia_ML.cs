using API.AppCode.DL;
using API.AppCode.IML;
using API.Data;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class SocialMedia_ML : ISocialMedia
    {
        private readonly IDapper _dapper;
        public SocialMedia_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateSocialMedia(SocialMedia socialMedia)
        {
            IProcedureAsync proc = new Proc_AddOrUpdateSocialMedia(_dapper);
            var i = await proc.Call(socialMedia);
            return (Response)i;
        }

        public async Task<IEnumerable<SocialMedia>> GetSocialMediaListOrById(Common common)
        {
            IProcedureAsync proc = new Proc_GetAllSocialMedia(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<SocialMedia>)i;
        }
    }
}
