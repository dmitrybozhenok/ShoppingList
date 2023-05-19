using Microsoft.EntityFrameworkCore;
using ShoppingList.Shared;

namespace ShoppingList.Api.Models
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext(DbContextOptions<ShoppingListContext> options)
        : base(options)
        {
        }

        public DbSet<Item> ShoppingListItems { get; set; } = null!;
    }
}
