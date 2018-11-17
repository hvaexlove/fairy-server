{ 'targets': [
    { 'target_name': 'dns_sd_bindings'
    , 'sources': [ 'src/mdns_lib/dns_sd.cpp'
                 , 'src/mdns_lib/dns_service_browse.cpp'
                 , 'src/mdns_lib/dns_service_enumerate_domains.cpp'
                 , 'src/mdns_lib/dns_service_get_addr_info.cpp'
                 , 'src/mdns_lib/dns_service_process_result.cpp'
                 , 'src/mdns_lib/dns_service_ref.cpp'
                 , 'src/mdns_lib/dns_service_ref_deallocate.cpp'
                 , 'src/mdns_lib/dns_service_ref_sock_fd.cpp'
                 , 'src/mdns_lib/dns_service_register.cpp'
                 , 'src/mdns_lib/dns_service_resolve.cpp'
                 , 'src/mdns_lib/dns_service_update_record.cpp'
                 , 'src/mdns_lib/mdns_utils.cpp'
                 , 'src/mdns_lib/network_interface.cpp'
                 , 'src/mdns_lib/socket_watcher.cpp'
                 , 'src/mdns_lib/txt_record_ref.cpp'
                 , 'src/mdns_lib/txt_record_create.cpp'
                 , 'src/mdns_lib/txt_record_deallocate.cpp'
                 , 'src/mdns_lib/txt_record_set_value.cpp'
                 , 'src/mdns_lib/txt_record_get_length.cpp'
                 , 'src/mdns_lib/txt_record_buffer_to_object.cpp'
                 ]
    , 'conditions': [
        [ 'OS!="mac" and OS!="win"', {
            'libraries': [ '-ldns_sd' ]
        }]
      , [ 'OS=="mac"', {
            'defines': [ 'HAVE_DNSSERVICEGETADDRINFO' ]
        }]
      , ['OS=="freebsd"', {
            'include_dirs': [ '/usr/local/include' ]
          , 'libraries': [ '-L/usr/local/lib' ]
        }]
      , ['OS=="win"', {
            'variables': {
                'BONJOUR_SDK_DIR': '$(BONJOUR_SDK_HOME)', # Preventing path resolution problems by saving the env var in variable first 
                'PLATFORM': '$(Platform)' # Set  the platform
              }
          , 'include_dirs': [ '<(BONJOUR_SDK_DIR)/Include' ]
          , 'defines': [ 'HAVE_DNSSERVICEGETADDRINFO' ]
          , 'libraries': [ '-l<(BONJOUR_SDK_DIR)/Lib/<(PLATFORM)/dnssd.lib'
                         , '-lws2_32.lib'
                         , '-liphlpapi.lib'
                         ]
        }]
      ]
    , "include_dirs": [ "<!(node -e \"require('nan')\")" ]
    # The following breaks the debug build, so just ignore the warning for now.
    #, 'msbuild_settings': {
    #    'ClCompile': { 'ExceptionHandling': 'Sync' }
    #  , 'Link'     : { 'IgnoreSpecificDefaultLibraries': [ 'LIBCMT' ] }
    #  }
    , 'configurations': {
        'Release': {
            'xcode_settings': { 'GCC_OPTIMIZATION_LEVEL': 3 }
          , 'cflags': [ '-O3' ]
          , 'ldflags': [ '-O3' ]
        }
      , 'Debug': {
            'xcode_settings': { 'GCC_OPTIMIZATION_LEVEL': 0 }
          , 'cflags': [ '-g', '-O0', ]
          , 'ldflags': [ '-g', '-O0' ]
        }
      , 'Coverage': {
            'xcode_settings': {
                'GCC_OPTIMIZATION_LEVEL': 0
              , 'OTHER_LDFLAGS': ['--coverage']
              , 'OTHER_CFLAGS':  ['--coverage']
            }
          , 'cflags': [ '-O0', '--coverage' ]
          , 'ldflags': [ '--coverage' ]
        }
      }
    }
  ]
}

# vim: filetype=python shiftwidth=2 softtabstop=2 :
