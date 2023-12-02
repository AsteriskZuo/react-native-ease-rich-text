
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeeEaseRichTextSpec.h"

@interface ReactNativeeEaseRichText : NSObject <NativeReactNativeeEaseRichTextSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReactNativeeEaseRichText : NSObject <RCTBridgeModule>
#endif

@end
