#import "AppDelegate.h"
#import <YandexMapsMobile/YMKMapKitFactory.h>
#import "Orientation.h"
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
#import <YandexMobileMetrica/YandexMobileMetrica.h>

@implementation AppDelegate

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
  return [Orientation getOrientation];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"deliverycx_mobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [YMKMapKit setLocale:@"ru_RU"];
  [YMKMapKit setApiKey:@"9319733b-bbba-48e7-af52-8410be35c07d"];
  [YMKMapKit mapKit];

  YMMYandexMetricaConfiguration *configuration = [[YMMYandexMetricaConfiguration alloc] initWithApiKey:@"ed245972-a303-449b-96b6-069395a6e9b7"];
  [YMMYandexMetrica activateWithConfiguration:configuration];

  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show];

  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
