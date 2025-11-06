import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, X, Navigation, Filter, Compass, Route, Eye, Layers, Camera, Map as MapIcon, Menu, ChevronUp, Home, List } from 'lucide-react';

const NITGoaCampusMap = () => {
  // ==================== API CONFIGURATION ====================
  // Enter your Google Maps API keys here
  const GOOGLE_MAPS_API_KEY = 'AIzaSyACb39kMvCZ3-hJGrQeheTs2xdzj5VfhnY';
  // ===========================================================
  
  // NIT Goa approximate coordinates
  const CAMPUS_CENTER = { lat: 15.3647, lng: 73.9687 };
  
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Main Academic Block",
      category: "academic",
      icon: "🏛️",
      lat: 15.169194,
      lng: 74.012103,
      description: "Primary academic building housing major departments including CSE, ECE, and Mechanical Engineering",
      timings: "8:00 AM - 8:00 PM",
      contact: "+91-832-2404200",
      image: "photos/Gyan_mandir.jpeg"
    },
    {
      id: 2,
      name: "Central Library",
      category: "facility",
      icon: "📚",
      lat: 15.169153,
      lng: 74.012588,
      description: "State-of-the-art library with extensive collection of books, journals, and digital resources",
      timings: "24/7",
      contact: "+91-832-2404210",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Boys Hostel 1",
      category: "hostel",
      icon: "🏠",
      lat: 15.171164,
      lng: 74.015680,
      description: "Accommodation facility for male students with modern amenities",
      timings: "24/7",
      contact: "+91-832-2404220",
      image: "photos/Boys_Hostel.jpeg"
    },
    {
      id: 4,
      name: "Girls Hostel",
      category: "hostel",
      icon: "🏠",
      lat: 15.169999,
      lng: 74.012111,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/Girls_hostel.jpeg"
    },
    {
      id: 4,
      name: "1 block",
      category: "Department",
      icon: "🏠",
      lat:15.169746,
      lng: 74.012963,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/WhatsApp Image 2025-11-04 at 2.08.10 PM.jpeg"
    },
    {
      id: 4,
      name: "2 block",
      category: "Department",
      icon: "🏠",
      lat:15.169797,
      lng: 74.013555,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/WhatsApp Image 2025-11-04 at 2.08.09 PM.jpeg"
    },
    {
      id: 4,
      name: "3 block",
      category: "Department",
      icon: "🏠",
      lat:15.169768,
      lng:74.014136,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/WhatsApp Image 2025-11-04 at 2.08.08 PM (1).jpeg"
    },
    {
      id: 4,
      name: "Admin block",
      category: "Department",
      icon: "🏠",
      lat:15.1681993,
      lng:74.0119999,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/admin_block.jpeg"
    },
    {
      id: 4,
      name: "Nescafe",
      category: "Department",
      icon: "🏠",
      lat:15.170309,
      lng:74.013932,
      description: "Accommodation facility for female students with secure access",
      timings: "24/7",
      contact: "+91-832-2404230",
      image: "photos/Nescafe.jpeg"
    },
     
    {
      id: 5,
      name: "ECE Department",
      category: "Department",
      icon: "⚽",
      lat: 15.168767,
      lng: 74.012959,
      description: "Multi-sport facility with indoor and outdoor courts, gymnasium",
      timings: "6:00 AM - 10:00 PM",
      contact: "+91-832-2404240",
      image: "photos/ece_department_block.jpeg"
    },
    {
      id: 6,
      name: "Cafeteria",
      category: "facility",
      icon: "🍽️",
      lat: 15.170013,
      lng: 74.013312,
      description: "Main dining facility serving variety of cuisines and snacks",
      timings: "7:00 AM - 11:00 PM",
      contact: "+91-832-2404250",
      image: "photos/canteen.jpeg"
    },
    {
      id: 7,
      name: "Main Gate",
      category: "entrance",
      icon: "🚪",
      lat: 15.167940,
      lng: 74.010721,
      description: "Primary entrance to campus with security check",
      timings: "24/7",
      contact: "+91-832-2404260",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      name: "CSE Department",
      category: "academic",
      icon: "💻",
      lat: 15.168767,
      lng:74.013543,
      description: "Computing labs with high-speed internet and latest hardware",
      timings: "8:00 AM - 10:00 PM",
      contact: "+91-832-2404270",
      image: "photos/cse_department_block.jpeg"
    },
    {
      id: 9,
      name: "Sport Ground",
      category: "academic",
      icon: "💻",
      lat: 15.171153,
      lng: 74.014353,
      description: "Computing labs with high-speed internet and latest hardware",
      timings: "8:00 AM - 10:00 PM",
      contact: "+91-832-2404270",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
    }

  ]);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [travelMode, setTravelMode] = useState('WALKING');
  const [mapType, setMapType] = useState('roadmap');
  const [routeInfo, setRouteInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  
  // Mobile UI states
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [detailPanelHeight, setDetailPanelHeight] = useState(0); // 0 = hidden, 1 = peek, 2 = half, 3 = full
  const [showMapTypeSelector, setShowMapTypeSelector] = useState(false);
  
  // Admin mode - set to false to hide edit button
  const ADMIN_MODE = false;
  
  // AR Mode states
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [cameraStream, setCameraStream] = useState(null);
  const [arBadges, setArBadges] = useState([]);
  const [selectedArLocation, setSelectedArLocation] = useState(null);
  
  const mapRef = useRef(null);
  const videoRef = useRef(null);
  const detailPanelRef = useRef(null);
  const touchStartY = useRef(0);

  const categories = [
    { id: 'all', name: 'All', color: 'bg-gray-600' },
    { id: 'academic', name: 'Academic', color: 'bg-blue-600' },
    { id: 'hostel', name: 'Hostels', color: 'bg-purple-600' },
    { id: 'facility', name: 'Facilities', color: 'bg-green-600' },
    { id: 'sports', name: 'Sports', color: 'bg-orange-600' },
    { id: 'entrance', name: 'Entrance', color: 'bg-red-600' }
  ];

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      academic: '#3bf660ff',
      hostel: '#A855F7',
      facility: '#10B981',
      sports: '#F97316',
      entrance: '#EF4444'
    };
    return colors[category] || '#6B7280';
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Calculate bearing between two coordinates
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    const bearing = (θ * 180 / Math.PI + 360) % 360;

    return bearing;
  };

  // Initialize Google Maps
  useEffect(() => {
    if (activeTab !== 'map') return;
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      console.warn('Please add your Google Maps API key');
      return;
    }

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!window.google || !mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: CAMPUS_CENTER,
        zoom: 17,
        mapTypeId: 'satellite',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      setMap(mapInstance);

      const renderer = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3B82F6',
          strokeWeight: 5
        }
      });
      setDirectionsRenderer(renderer);
    }
  }, [mapType, activeTab]);

  const markersRef = useRef([]);

useEffect(() => {
  if (!map || !window.google || activeTab !== 'map') return;

  const existingMarkers = markersRef.current;

  // Compare current locations with existing markers
  const currentIds = new Set(existingMarkers.map(m => m.id));
  const newIds = new Set(filteredLocations.map(l => l.id));

  // Remove only markers that are no longer needed
  existingMarkers.forEach(marker => {
    if (!newIds.has(marker.id)) {
      marker.setMap(null);
    }
  });

  // Add new markers that aren’t already on the map
  filteredLocations.forEach(location => {
    if (!currentIds.has(location.id)) {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: getCategoryColor(location.category),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        optimized: true
      });

      marker.id = location.id;
      marker.addListener('click', () => {
        setSelectedLocation(location);
        setDetailPanelHeight(2);
        map.panTo({ lat: location.lat, lng: location.lng });
      });

      markersRef.current.push(marker);
    }
  });

  // Optional: remove duplicates
  markersRef.current = markersRef.current.filter(m => newIds.has(m.id));
}, [map, filteredLocations, activeTab]);

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(pos);

          if (map && activeTab === 'map') {
            if (userMarker) {
              userMarker.setPosition(pos);
            } else if (window.google) {
              const marker = new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your Location',
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#4F46E5',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 4
                },
                zIndex: 1000
              });

              new window.google.maps.Circle({
                map: map,
                center: pos,
                radius: position.coords.accuracy,
                fillColor: '#4F46E5',
                fillOpacity: 0.1,
                strokeColor: '#4F46E5',
                strokeOpacity: 0.3,
                strokeWeight: 1
              });

              setUserMarker(marker);
            }
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map, userMarker, window.google, activeTab]);

  // AR Mode - Camera Access
  useEffect(() => {
    if (activeTab === 'ar' && !cameraStream) {
      startARMode();
    } else if (activeTab === 'map' && cameraStream) {
      stopARMode();
    }

    return () => {
      if (cameraStream) {
        stopARMode();
      }
    };
  }, [activeTab]);

  const startARMode = async () => {
    try {
      console.log('Starting AR mode...');
      
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera not supported on this device/browser');
        return;
      }

      // Request camera with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      console.log('Camera stream obtained:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('autoplay', 'true');
        videoRef.current.muted = true;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          videoRef.current.play().then(() => {
            console.log('Camera started successfully');
          }).catch(err => {
            console.error('Video play error:', err);
          });
        };
      }
      setCameraStream(stream);
      
      // Request device orientation permission (iOS)
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permissionState = await DeviceOrientationEvent.requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            console.log('Device orientation permission granted');
          } else {
            alert('Device orientation permission denied. AR features may not work properly.');
          }
        } catch (error) {
          console.error('Permission request failed:', error);
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
        console.log('Device orientation listener added');
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Camera access failed: ' + err.message + '\n\nMake sure you are using HTTPS and have granted camera permissions.');
    }
  };

  const stopARMode = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    window.removeEventListener('deviceorientation', handleOrientation);
  };

  const handleOrientation = (event) => {
    setDeviceOrientation({
      alpha: event.alpha || 0,
      beta: event.beta || 0,
      gamma: event.gamma || 0
    });
  };

  // Calculate AR Badge positions
  useEffect(() => {
    if (activeTab !== 'ar' || !userLocation) return;

    const badges = filteredLocations.map(location => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      );

      const bearing = calculateBearing(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      );

      const deviceHeading = deviceOrientation.alpha;
      let relativeBearing = bearing - deviceHeading;
      
      if (relativeBearing > 180) relativeBearing -= 360;
      if (relativeBearing < -180) relativeBearing += 360;

      const isVisible = Math.abs(relativeBearing) < 45 && distance < 500;

      return {
        ...location,
        distance,
        bearing,
        relativeBearing,
        isVisible
      };
    }).filter(badge => badge.isVisible);

    setArBadges(badges);
  }, [userLocation, deviceOrientation, filteredLocations, activeTab]);

  // Get directions
  const getDirections = (destination) => {
    if (!map || !window.google || !directionsRenderer) return;

    const origin = userLocation || CAMPUS_CENTER;
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode[travelMode]
      },
      (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          setRouteInfo({
            distance: route.distance.text,
            duration: route.duration.text,
            steps: route.steps.length
          });
        }
      }
    );
  };

  const clearDirections = () => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
      setRouteInfo(null);
    }
  };

  const centerOnUser = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
      map.setZoom(18);
    }
  };

  const changeMapType = (type) => {
    setMapType(type);
    if (map) {
      map.setMapTypeId(type);
    }
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setLocations(parsed);
      setShowJsonEditor(false);
      alert('Locations updated successfully!');
    } catch (e) {
      alert('Invalid JSON format');
    }
  };

  useEffect(() => {
    setJsonInput(JSON.stringify(locations, null, 2));
  }, [locations]);

  // Handle detail panel swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;

    if (diff > 50 && detailPanelHeight < 3) {
      setDetailPanelHeight(prev => prev + 1);
      touchStartY.current = currentY;
    } else if (diff < -50 && detailPanelHeight > 0) {
      setDetailPanelHeight(prev => prev - 1);
      touchStartY.current = currentY;
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Mobile Header - Only show on mobile */}
      <div className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-lg font-bold">NIT Goa</h1>
            <p className="text-xs text-blue-100">Campus Navigator</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearchPanel(!showSearchPanel)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Search size={24} />
          </button>
          {ADMIN_MODE && (
            <button
              onClick={() => setShowJsonEditor(!showJsonEditor)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex bg-black/50 backdrop-blur-lg border-b border-gray-700 p-4 z-10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NIT Goa Campus Navigator
            </h1>
            <p className="text-gray-400 text-sm mt-1">Interactive Campus Map with AR Navigation</p>
          </div>
          {ADMIN_MODE && (
            <button
              onClick={() => setShowJsonEditor(!showJsonEditor)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Edit Locations
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map View */}
        {activeTab === 'map' && (
          <div ref={mapRef} className="w-full h-full" />
        )}

        {/* AR View */}
        {activeTab === 'ar' && (
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* Camera loading indicator */}
            {!cameraStream && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <Camera size={48} className="text-gray-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-white text-lg">Starting Camera...</p>
                  <p className="text-gray-400 text-sm mt-2">Please allow camera access</p>
                </div>
              </div>
            )}

            {/* AR Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Compass */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-lg border border-gray-600 rounded-full px-6 py-3 flex items-center gap-2">
                <Compass size={20} className="text-blue-400" />
                <span className="text-white font-bold">{Math.round(deviceOrientation.alpha)}°</span>
              </div>

              {/* AR Badges */}
              {arBadges.map(badge => {
                const screenWidth = window.innerWidth;
                const fov = 90;
                const xPos = ((badge.relativeBearing + fov/2) / fov) * screenWidth;
                
                const maxDistance = 500;
                const distanceRatio = Math.max(0, 1 - (badge.distance / maxDistance));
                const yPos = 80 + (distanceRatio * 200);

                return (
                  <button
                    key={badge.id}
                    onClick={() => {
                      setSelectedArLocation(badge);
                      setDetailPanelHeight(2);
                    }}
                    className="absolute pointer-events-auto transform -translate-x-1/2 transition-all duration-300 active:scale-95"
                    style={{
                      left: `${xPos}px`,
                      top: `${yPos}px`
                    }}
                  >
                    <div className="relative">
                      {/* Badge Circle */}
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                        <span className="text-4xl">{badge.icon}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-pulse -z-10"></div>

                      {/* Label */}
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-lg border border-gray-600 rounded-lg px-4 py-2 shadow-xl min-w-max">
                        <div className="text-white font-bold text-sm text-center">{badge.name}</div>
                        <div className="text-blue-400 text-xs text-center mt-1">
                          {Math.round(badge.distance)}m
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* No Buildings */}
              {arBadges.length === 0 && userLocation && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
                  <div className="bg-black/70 backdrop-blur-lg border border-gray-600 rounded-xl p-6 mx-4">
                    <Compass size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold mb-2">No Buildings in View</p>
                    <p className="text-gray-400 text-sm">Turn around to discover locations</p>
                  </div>
                </div>
              )}

              {/* Crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 border-2 border-white/50 rounded-full">
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Buttons - Map Mode */}
        {activeTab === 'map' && (
          <div className="absolute right-4 bottom-24 lg:bottom-4 flex flex-col gap-3">
            {/* Map Type Selector Button */}
            <button
              onClick={() => setShowMapTypeSelector(!showMapTypeSelector)}
              className="w-14 h-14 bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-full shadow-2xl flex items-center justify-center transition-all border-2 border-gray-600"
            >
              <Layers size={24} className="text-white" />
            </button>
            
            {/* Center on User */}
            <button
              onClick={centerOnUser}
              className="w-14 h-14 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-full shadow-2xl flex items-center justify-center transition-all"
            >
              <Compass size={24} />
            </button>
            
            {/* Clear Directions */}
            {routeInfo && (
              <button
                onClick={clearDirections}
                className="w-14 h-14 bg-red-600 hover:bg-red-700 active:scale-95 rounded-full shadow-2xl flex items-center justify-center transition-all"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Map Type Selector Popup */}
        {showMapTypeSelector && activeTab === 'map' && (
          <div className="absolute right-20 bottom-24 lg:bottom-4 bg-black/90 backdrop-blur-lg border border-gray-600 rounded-xl p-3 shadow-2xl">
            <div className="flex flex-col gap-2 min-w-max">
              {[
                { id: 'roadmap', name: 'Road', icon: '🗺️' },
                { id: 'satellite', name: 'Satellite', icon: '🛰️' },
                { id: 'hybrid', name: 'Hybrid', icon: '🌍' },
                { id: 'terrain', name: 'Terrain', icon: '⛰️' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    changeMapType(type.id);
                    setShowMapTypeSelector(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    mapType === type.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden bg-black/90 backdrop-blur-lg border-t border-gray-700 safe-area-pb">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => {
              setActiveTab('map');
              setDetailPanelHeight(0);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all ${
              activeTab === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400'
            }`}
          >
            <MapIcon size={24} />
            <span className="text-xs font-medium">Map</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('ar');
              setDetailPanelHeight(0);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all ${
              activeTab === 'ar' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400'
            }`}
          >
            <Camera size={24} />
            <span className="text-xs font-medium">AR</span>
          </button>
          <button
            onClick={() => setShowDrawer(true)}
            className="flex flex-col items-center gap-1 py-2 px-6 text-gray-400"
          >
            <List size={24} />
            <span className="text-xs font-medium">Places</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showDrawer && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDrawer(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-5/6 max-w-sm bg-gray-900 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Campus Locations</h2>
                <button onClick={() => setShowDrawer(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-3">Filter by Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat.id
                          ? `${cat.color} text-white`
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-3">
                {filteredLocations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setDetailPanelHeight(2);
                      setShowDrawer(false);
                      if (activeTab === 'map' && map) {
                        map.panTo({ lat: loc.lat, lng: loc.lng });
                        map.setZoom(18);
                      }
                    }}
                    className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{loc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{loc.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{loc.timings}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Panel */}
      {showSearchPanel && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setShowSearchPanel(false)}>
                <X size={24} />
              </button>
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              />
            </div>

            <div className="space-y-2">
              {filteredLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setDetailPanelHeight(2);
                    setShowSearchPanel(false);
                    if (activeTab === 'map' && map) {
                      map.panTo({ lat: loc.lat, lng: loc.lng });
                      map.setZoom(18);
                    }
                  }}
                  className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{loc.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{loc.name}</div>
                      <div className="text-xs text-gray-400">{loc.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Detail Panel - Swipeable */}
      {(selectedLocation || selectedArLocation) && (
        <div
          ref={detailPanelRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className={`lg:hidden fixed left-0 right-0 bg-gray-900 rounded-t-3xl shadow-2xl transition-all duration-300 z-30 overflow-hidden ${
            detailPanelHeight === 0 ? 'bottom-0 translate-y-full' :
            detailPanelHeight === 1 ? 'bottom-16 h-40' :
            detailPanelHeight === 2 ? 'bottom-16 h-2/3' :
            'bottom-16 h-[calc(100vh-8rem)]'
          }`}
        >
          {/* Swipe Handle */}
          <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
          </div>

          <div className="px-6 pb-6 overflow-y-auto h-full">
            {(selectedLocation || selectedArLocation) && (() => {
              const loc = selectedLocation || selectedArLocation;
              return (
                <>
                  <button
                    onClick={() => {
                      setSelectedLocation(null);
                      setSelectedArLocation(null);
                      setDetailPanelHeight(0);
                    }}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{loc.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{loc.name}</h3>
                      {loc.distance && (
                        <div className="text-blue-400 text-sm mt-1">
                          {Math.round(loc.distance)}m away
                        </div>
                      )}
                    </div>
                  </div>

                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />

                  <p className="text-gray-300 text-sm mb-4">{loc.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Clock size={20} />
                      <span>{loc.timings}</span>
                    </div>
                    {loc.contact && (
                      <div className="flex items-center gap-3 text-gray-400">
                        <MapPin size={20} />
                        <span>{loc.contact}</span>
                      </div>
                    )}
                  </div>

                  {activeTab === 'map' && (
                    <div className="space-y-3">
                      <button
                        onClick={() => getDirections(loc)}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Navigation size={20} />
                        Get Directions
                      </button>
                      
                      {routeInfo && (
                        <div className="bg-gray-800 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Route size={18} className="text-blue-400" />
                            Route Info
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Distance:</span>
                              <span className="font-medium">{routeInfo.distance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Duration:</span>
                              <span className="font-medium">{routeInfo.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Mode:</span>
                              <span className="font-medium capitalize">{travelMode.toLowerCase()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ar' && (
                    <button
                      onClick={() => {
                        setActiveTab('map');
                        setSelectedLocation(selectedArLocation);
                        setSelectedArLocation(null);
                      }}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <MapIcon size={20} />
                      View on Map
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-20 bottom-0 w-96 bg-black/30 backdrop-blur-lg border-r border-gray-700 flex-col overflow-hidden z-10">
        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MapIcon size={20} />
              Map
            </button>
            <button
              onClick={() => setActiveTab('ar')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Camera size={20} />
              AR
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-semibold">Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredLocations.map(loc => (
            <button
              key={loc.id}
              onClick={() => {
                setSelectedLocation(loc);
                if (activeTab === 'map' && map) {
                  map.panTo({ lat: loc.lat, lng: loc.lng });
                }
              }}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedLocation?.id === loc.id
                  ? 'bg-blue-600/20 border border-blue-500'
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{loc.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{loc.name}</div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {loc.timings}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Detail Panel */}
      {selectedLocation && (
        <div className="hidden lg:block fixed bottom-4 right-4 w-96 max-h-[80vh] bg-black/90 backdrop-blur-xl border border-gray-600 rounded-xl p-6 overflow-y-auto z-20">
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <img
            src={selectedLocation.image}
            alt={selectedLocation.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          
          <h3 className="text-xl font-bold mb-2">{selectedLocation.name}</h3>
          <p className="text-gray-300 text-sm mb-4">{selectedLocation.description}</p>
          
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>{selectedLocation.timings}</span>
            </div>
            {selectedLocation.contact && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>{selectedLocation.contact}</span>
              </div>
            )}
          </div>

          {activeTab === 'map' && (
            <>
              <button
                onClick={() => getDirections(selectedLocation)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center gap-2 mb-3 transition-colors"
              >
                <Navigation size={18} />
                Get Directions
              </button>

              {routeInfo && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Route size={16} className="text-blue-400" />
                    Route Information
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distance:</span>
                      <span className="font-medium">{routeInfo.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-medium">{routeInfo.duration}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* JSON Editor Modal */}
      {showJsonEditor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Location Data (JSON)</h2>
              <button onClick={() => setShowJsonEditor(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveJson}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowJsonEditor(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg text-xs text-gray-400">
              <p className="font-semibold mb-2">JSON Format:</p>
              <pre className="text-xs overflow-x-auto">
{`[
  {
    "id": 1,
    "name": "Building Name",
    "category": "academic",
    "icon": "🏛️",
    "lat": 15.3650,
    "lng": 73.9690,
    "description": "Description",
    "timings": "8:00 AM - 8:00 PM",
    "contact": "+91-XXX-XXX",
    "image": "https://..."
  }
]`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NITGoaCampusMap;
