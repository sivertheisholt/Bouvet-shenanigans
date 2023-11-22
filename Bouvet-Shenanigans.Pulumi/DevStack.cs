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


            // Get the publishing credentials for the created Web App
            var credentials = Output.Tuple(resourceGroup.Name, webApp.Name).Apply(names =>
                ListWebAppPublishingCredentials.InvokeAsync(
                    new ListWebAppPublishingCredentialsArgs
                    {
                        Name = names.Item2,
                        ResourceGroupName = names.Item1
                    }));

            // Export the publishing credentials
            PublishingUser = credentials.Apply(c => c.PublishingUserName);
            PublishingPassword = credentials.Apply(c => c.PublishingPassword);
        }

        [Output]
        public Output<string> PublishingUser { get; set; }
        [Output]
        public Output<string> PublishingPassword { get; set; }
    }
}