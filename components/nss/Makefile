#
# CDDL HEADER START
#
# The contents of this file are subject to the terms of the
# Common Development and Distribution License (the "License").
# You may not use this file except in compliance with the License.
#
# You can obtain a copy of the license at usr/src/OPENSOLARIS.LICENSE
# or http://www.opensolaris.org/os/licensing.
# See the License for the specific language governing permissions
# and limitations under the License.
#
# When distributing Covered Code, include this CDDL HEADER in each
# file and include the License file at usr/src/OPENSOLARIS.LICENSE.
# If applicable, add the following below this CDDL HEADER, with the
# fields enclosed by brackets "[]" replaced with your own identifying
# information: Portions Copyright [yyyy] [name of copyright owner]
#
# CDDL HEADER END
#

#
# Copyright (c) 2019, Oracle and/or its affiliates. All rights reserved.
#

BUILD_BITS=		32_and_64

COMPILER= gcc

# The Makefile of this component does not support multiple build jobs.
COMPONENT_MAKE_JOBS=1

include ../../make-rules/shared-macros.mk

COMPONENT_NAME=		nss
COMPONENT_VERSION=	3.45
# NSS ips major version is incorrect for historical reasons.
IPS_COMPONENT_VERSION=	4.45
HUMAN_VERSION=		$(COMPONENT_VERSION)
COMPONENT_UVERSION=	$(subst .,_,$(COMPONENT_VERSION))
COMPONENT_PROJECT_URL=	https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS
COMPONENT_ARCHIVE=	$(COMPONENT_SRC).tar.gz
COMPONENT_ARCHIVE_HASH=	\
    sha256:112f05223d1fde902c170966bfc6f011b24a838be16969b110ecf2bb7bc24e8b
COMPONENT_ARCHIVE_URL=	http://ftp.mozilla.org/pub/security/$(COMPONENT_NAME)/releases/NSS_$(COMPONENT_UVERSION)_RTM/src/$(COMPONENT_ARCHIVE)
COMPONENT_BUGDB=	library/nss
COMPONENT_ANITYA_ID=	2503

TPNO=			52934

BUILD_STYLE= justmake

DIST_OBJ.i386.32 =	dist/SunOS5.11_i86pc_gcc_OPT.OBJ
DIST_OBJ.i386.64 =	dist/SunOS5.11_i86pc_gcc_64_OPT.OBJ
DIST_OBJ.sparc.32 =	dist/SunOS5.11_gcc_OPT.OBJ
DIST_OBJ.sparc.64 =	dist/SunOS5.11_gcc_64_OPT.OBJ

include $(WS_MAKE_RULES)/common.mk

COMPONENT_PRE_BUILD_ACTION = \
	($(CLONEY) $(SOURCE_DIR)/nss $(@D))

NSPR_LIB_DIR.32 =	/usr/lib/mps
NSPR_LIB_DIR.64 =	/usr/lib/mps/64
SQLITE_LIB_DIR.32 =	$(USRLIBDIR)
SQLITE_LIB_DIR.64 =	$(USRLIBDIR64)
USE_64_FLAG.64 = USE_64=1

NSS_ENV += NS_USE_GCC=1
NSS_ENV += BUILD_OPT=1
NSS_ENV += BUILD_SUN_PKG=1
NSS_ENV += NSS_USE_SYSTEM_SQLITE=1
NSS_ENV += NSPR_INCLUDE_DIR=/usr/include/mps
NSS_ENV += NSPR_LIB_DIR=$(NSPR_LIB_DIR.$(BITS))
NSS_ENV += SQLITE_LIB_DIR=$(SQLITE_LIB_DIR.$(BITS))
NSS_ENV += NSS_ENABLE_WERROR=0
NSS_ENV += $(USE_64_FLAG.$(BITS))

COMPONENT_BUILD_ENV += $(NSS_ENV)

COMPONENT_INSTALL_ENV += $(NSS_ENV)
COMPONENT_INSTALL_ARGS += CC=$(CC)

PKG_PROTO_DIRS += "$(BUILD_DIR)/$(MACH64)/cmd"

MAJOR_VER := $(word 1,$(subst ., ,$(COMPONENT_VERSION)))
MINOR_VER := $(word 2,$(subst ., ,$(COMPONENT_VERSION)))
PATCH_VER := $(word 3,$(subst ., ,$(COMPONENT_VERSION)))

NSPR_VERSION=$(shell perl -ne 'print "$$1\n" if m/^Version:\s+(\S+)/' /usr/lib/pkgconfig/nspr.pc)
ifeq ($(NSPR_VERSION),)
$(error "Can't determine nspr version")
endif

REPLACE_STRING  = -e 's/%NSS_VERSION%/$(COMPONENT_VERSION)/'
REPLACE_STRING += -e "s/%NSPR_VERSION%/$(NSPR_VERSION)/"

COMPONENT_POST_INSTALL_ACTION.32 += \
   ( \
      $(MKDIR) "$(PROTO_DIR)/usr/lib/mps/" "$(PROTO_DIR)/usr/lib/pkgconfig"; \
      rsync --exclude '*.a' --copy-links -r "$(BUILD_DIR)/$(DIST_OBJ.$(MACH).32)/lib/" "$(PROTO_DIR)/usr/lib/mps/"; \
      $(GSED) $(REPLACE_STRING) files/nss.pc > "$(PROTO_DIR)/usr/lib/pkgconfig/nss.pc" \
   )

COMPONENT_POST_INSTALL_ACTION.64 += \
   ( \
      $(MKDIR) "$(PROTO_DIR)/usr/include/mps" "$(PROTO_DIR)/usr/lib/mps/$(MACH64)" "$(PROTO_DIR)/usr/bin/"; \
      rsync --copy-links -r "$(BUILD_DIR)/dist/public/nss/" "$(PROTO_DIR)/usr/include/mps/"; \
      rsync --exclude '*.a' --copy-links -r "$(BUILD_DIR)/$(DIST_OBJ.$(MACH).64)/lib/" "$(PROTO_DIR)/usr/lib/mps/$(MACH64)/"; \
      rsync                 --copy-links -r "$(BUILD_DIR)/$(DIST_OBJ.$(MACH).64)/bin/" "$(PROTO_DIR)/usr/bin/"; \
      sed -e 's,@prefix@,/usr,' -e 's,@MOD_MAJOR_VERSION@,$(MAJOR_VER),' -e 's,@MOD_MINOR_VERSION@,$(MINOR_VER),' \
          -e 's,@MOD_PATCH_VERSION@,$(PATCH_VER),' $(SOURCE_DIR)/nss/pkg/pkg-config/nss-config.in > $(PROTO_DIR)/usr/bin/nss-config; \
      chmod 755 $(PROTO_DIR)/usr/bin/nss-config; \
      $(MKDIR) "$(PROTO_DIR)/usr/lib/$(MACH64)/pkgconfig"; \
      $(GSED) $(REPLACE_STRING) files/nss-64.pc > "$(PROTO_DIR)/usr/lib/$(MACH64)/pkgconfig/nss.pc" \
   )

COMPONENT_PRE_TEST_ACTION += $(RM) -r "$(COMPONENT_TEST_BUILD_DIR)/tests_results"
COMPONENT_TEST_MASTER = $(COMPONENT_TEST_RESULTS_DIR)/results-$(BITS)-$(MACH).master
COMPONENT_TEST_DIR =	$(@D)/tests
COMPONENT_TEST_ENV +=	$(NSS_ENV)
COMPONENT_TEST_ENV +=	TESTDIR=$(COMPONENT_TEST_BUILD_DIR)
COMPONENT_TEST_CMD =	./all.sh
COMPONENT_TEST_TARGETS =
COMPONENT_TEST_TRANSFORMS = \
        '-e "/^Failed:/d" ' \
        '-e "/^Tests summary:/,/Unknown status:/p" ' \
        '-e "/.*/d" '

REQUIRED_PACKAGES += database/sqlite-3
REQUIRED_PACKAGES += library/nspr
REQUIRED_PACKAGES += system/rsyslog
# for usr/bin/smime_gtest
REQUIRED_PACKAGES += system/library/gcc/gcc-c++-runtime
REQUIRED_PACKAGES += system/library/gcc/gcc-c-runtime
