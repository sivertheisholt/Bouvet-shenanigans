using Pulumi;
using Pulumi.AzureNative.ContainerInstance;
using Pulumi.AzureNative.ContainerInstance.Inputs;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Web;

namespace Bouvet_Shenanigans.Pulumi
{
    public class DevStack : Stack
    {
        public DevStack()
        {
            // Create an Azure Resource Group
            var resourceGroup = new ResourceGroup("Testing", new ResourceGroupArgs
            {
                Location = "West Europe",
            });

            var testingContainerGroup = new ContainerGroup("TestingContainerGroup", new ContainerGroupArgs
            {
                ResourceGroupName = resourceGroup.Name,
                /*
                Containers =
                {
                new ContainerArgs
                {
                    Name = "myapp",
                    Image = "myacr.azurecr.io/myapp:v1",
                    Resources = new ResourceRequirementsArgs
                    {
                        Requests = new ResourceRequestsArgs
                        {
                            Cpu = 1,
                            MemoryInGB = 1.5,
                        }
                    },
                    Ports = { new ContainerPortArgs { Port = 80 } },
                    }
                },
                */
                OsType = OperatingSystemTypes.Linux,
                IpAddress = new IpAddressArgs
                {
                    Ports = { new PortArgs { Port = 80, Protocol = "TCP" } },
                    Type = "Public",
                },
            });
        }
    }
}