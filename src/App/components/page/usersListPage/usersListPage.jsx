import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/UsersTable";
import _ from "lodash";
import Loader from "../../loader/loader";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getProfession, getProfessionLoadingStatus } from "../../../store/profession";

const UsersListPage = () => {
    const professions = useSelector(getProfession())
    const professionsLoading = useSelector(getProfessionLoadingStatus())
    const { currentUser } = useAuth();
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const { users } = useUser();
    console.log(users)
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            } else {
                return user;
            }
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Все пользователи
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            selectedSort={sortBy}
                            onSort={handleSort}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 200
            }}
        >
            <Loader />
        </div>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
