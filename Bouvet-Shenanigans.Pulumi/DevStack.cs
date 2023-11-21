using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Web;

namespace Bouvet_Shenanigans.Pulumi
{
    public class DevStack : Stack
    {
        public DevStack()
        {
            // Create an Azure Resource Group
            var resourceGroup = new ResourceGroup("resourceGroup", new ResourceGroupArgs
            {
                Location = "West Europe",
            });

            var webApp = new WebApp("BouvetShenanigansWebApp", new WebAppArgs
            {
                ResourceGroupName = resourceGroup.Name,
            });
        }
    }
}