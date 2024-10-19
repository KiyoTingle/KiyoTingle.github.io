document.addEventListener('DOMContentLoaded', () => {
    const tripForm = document.getElementById('trip-form');
    const tripList = document.getElementById('trip-list');

    // 从本地存储加载数据
    let trips = JSON.parse(localStorage.getItem('trips')) || [];

    // 显示现有的旅行计划
    trips.forEach(addTripToList);

    // 处理表单提交
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const locationInput = document.getElementById('location');
        const dateInput = document.getElementById('date');

        const trip = {
            location: locationInput.value,
            date: dateInput.value
        };

        trips.push(trip);
        localStorage.setItem('trips', JSON.stringify(trips));

        addTripToList(trip);
        tripForm.reset();
    });

    // 将旅行计划添加到列表中
    function addTripToList(trip) {
        const li = document.createElement('li');
        li.textContent = `地点：${trip.location}，计划时间：${trip.date}`;

        // 添加删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => {
            tripList.removeChild(li);
            trips = trips.filter(t => t !== trip);
            localStorage.setItem('trips', JSON.stringify(trips));
        });

        li.appendChild(deleteButton);
        tripList.appendChild(li);
    }
});
