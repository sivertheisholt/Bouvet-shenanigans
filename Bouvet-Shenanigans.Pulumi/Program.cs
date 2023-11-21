using Pulumi;

namespace Bouvet_Shenanigans.Pulumi
{
  class Program
  {
    static Task<int> Main() => Deployment.RunAsync<DevStack>();
  }
}