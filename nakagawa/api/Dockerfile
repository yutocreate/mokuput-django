FROM nvidia/cuda:10.0-cudnn7-devel-ubuntu16.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        g++ \
        cmake \
        sudo \
        libssl-dev \
        libreadline-dev \
        build-essential \
        vim \
        file\
        curl \
        wget \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
#        mecab \
#        mecab-ipadic-utf8 \
        pkg-config \
        python3 \
        python3-dev \
        python3-pip \
        python3-setuptools \
        python3-wheel \
        gcc \
        git \
        rsync \
        software-properties-common \
        swig \
        libgtk2.0-dev \
        libavcodec-dev \
        libavformat-dev \
        libswscale-dev \
        libopencv-dev \
        libdc1394-22 \
        libdc1394-22-dev \
        libjpeg-dev \
#        libmecab-dev \
        libpng12-dev \
        libtiff5-dev \
        libjasper-dev \
        libavcodec-dev \
        libavformat-dev \
        libswscale-dev \
        libxine2-dev \
        libgstreamer0.10-dev \
        libgstreamer-plugins-base0.10-dev \
        libv4l-dev \
        libtbb-dev \
        libqt4-dev \
        libfaac-dev \
        libmp3lame-dev \
        libopencore-amrnb-dev \
        libopencore-amrwb-dev \
        libtheora-dev \
        libvorbis-dev \
        libxvidcore-dev \
        x264 \
        xz-utils\
        v4l-utils \
        unzip \
        nano \
        language-pack-ja \
        fonts-ipafont \
        ca-certificates \
        software-properties-common \
        mysql-client \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# RUN set -x && \
#     mkdir -p /root/.config/matplotlib && \
#     echo 'backend : Agg' > /root/.config/matplotlib/matplotlibrc && \
#     echo 'font.family : IPAPGothic' >> /root/.config/matplotlib/matplotlibrc

# RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git\
#     && cd mecab-ipadic-neologd\
#     && bin/install-mecab-ipadic-neologd -n -y

WORKDIR /api

# Directory Copy
ADD ./requirements.txt ./requirements.txt
ADD ./config ./config
ADD ./modules ./modules

RUN /bin/bash -l -c 'pip3 install pip'
RUN /bin/bash -l -c 'pip3 install --upgrade pip'
RUN /bin/bash -l -c 'pip3 install -r requirements.txt'

