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
# Copyright (c) 2011, 2019, Oracle and/or its affiliates. All rights reserved.
#
BUILD_BITS= 64
include ../../make-rules/shared-macros.mk

COMPONENT_NAME=		less
COMPONENT_VERSION=	551
COMPONENT_PROJECT_URL=	http://www.greenwoodsoftware.com/less/
COMPONENT_ARCHIVE_HASH= \
    sha256:ff165275859381a63f19135a8f1f6c5a194d53ec3187f94121ecd8ef0795fe3d
COMPONENT_ARCHIVE_URL=	$(COMPONENT_PROJECT_URL)$(COMPONENT_ARCHIVE)
COMPONENT_ANITYA_ID=	1550

TPNO=			52288

TEST_TARGET= $(NO_TESTS)
include $(WS_MAKE_RULES)/common.mk

# Fix 64-bit linking done via compiler.
LDFLAGS += $(CC_BITS)

REQUIRED_PACKAGES += library/ncurses
