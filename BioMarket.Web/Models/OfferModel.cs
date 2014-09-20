namespace BioMarket.Web.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Linq.Expressions;

    using BioMarket.Models;

    public class OfferModel
    {
        public static Expression<Func<Offer, OfferModel>> FromOffer
        {
            get
            {
                return a => new OfferModel
                {
                    Id = a.Id,
                    Quantity = a.Quantity,
                    ProductPhoto = a.ProductPhoto,
                    PostDate = a.PostDate
                };
            }
        }

        public static Expression<Func<Offer, OfferModel>> FromOfferForKendoGrid
        {
            get
            {
                return a => new OfferModel
                {
                    Id = a.Id,
                    Quantity = a.Quantity,
                    ProductPhoto = a.ProductPhoto,
                    PostDate = a.PostDate,
                    Farm = a.Product.Farm.Name,
                    FarmId = a.Product.FarmId,
                    ProductName = a.Product.Name
                };
            }
        }

        public static Expression<Func<Offer, OfferModel>> FromOfferWithProductAndBoughtBuy
        {
            get
            {
                return a => new OfferModel
                {
                    Id = a.Id,
                    Quantity = a.Quantity,
                    ProductPhoto = a.ProductPhoto,
                    PostDate = a.PostDate,
                    BoughtBy = new ClientModel
                    {
                        Account = a.BoughtBy.Account,
                        FirstName = a.BoughtBy.FirstName,
                        LastName = a.BoughtBy.LastName
                    },
                    BoughtDate = a.BoughtDate,
                    ProductId = a.ProductId
                };
            }
        }

        public int Id { get; set; }

        public int ProductId { get; set; }

        [Required]
        public double Quantity { get; set; }

        public string ProductPhoto { get; set; }

        public ClientModel BoughtBy { get; set; }

        [Required]
        public DateTime PostDate { get; set; }

        public DateTime? BoughtDate { get; set; }

        public string Farm { get; set; }

        public int FarmId { get; set; }

        public string ProductName { get; set; }

        public bool Deleted { get; set; }
    }
}